import React from 'react'

// 层级颜色映射
const layerColors = {
  0: '#3498db', // 蓝色 - Camera
  1: '#2ecc71', // 绿色 - Process
  2: '#f39c12', // 橙色 - Text
  3: '#9b59b6', // 紫色
  4: '#e74c3c', // 红色
  5: '#1abc9c', // 青色
}

// 根据源类型获取中文名称
const getSourceTypeName = (sourceType) => {
  const typeMap = {
    'camera': '摄像头',
    'process': '进程',
    'text': '文本'
  }
  return typeMap[sourceType] || sourceType
}

function CanvasPreview({ data }) {
  const { resolution, layers } = data
  const { width: canvasWidth, height: canvasHeight } = resolution
  
  // 计算显示尺寸，保持宽高比
  const maxDisplayWidth = 800
  const maxDisplayHeight = 450
  const aspectRatio = canvasWidth / canvasHeight
  
  let displayWidth, displayHeight
  if (aspectRatio > maxDisplayWidth / maxDisplayHeight) {
    displayWidth = maxDisplayWidth
    displayHeight = maxDisplayWidth / aspectRatio
  } else {
    displayHeight = maxDisplayHeight
    displayWidth = maxDisplayHeight * aspectRatio
  }
  
  const scaleX = displayWidth / canvasWidth
  const scaleY = displayHeight / canvasHeight

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">画布预览</h2>
        <div className="text-sm text-gray-600">
          原始分辨率: {canvasWidth} × {canvasHeight}
        </div>
      </div>
      
      <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
        <div className="relative" style={{ width: displayWidth, height: displayHeight }}>
          <svg 
            width={displayWidth} 
            height={displayHeight}
            className="border border-gray-400 bg-black"
            viewBox={`0 0 ${displayWidth} ${displayHeight}`}
          >
            {/* 绘制每个图层 */}
            {layers.map((layer, index) => {
              const [x, y, width, height] = layer.canvasOverlapRect
              const color = layerColors[layer.layer] || '#95a5a6'
              
              // 转换坐标
              const displayX = x * scaleX
              const displayY = y * scaleY
              const displayW = width * scaleX
              const displayH = height * scaleY
              
              return (
                <g key={index}>
                  {/* 矩形框 */}
                  <rect
                    x={displayX}
                    y={displayY}
                    width={displayW}
                    height={displayH}
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                  
                  {/* 填充（半透明） */}
                  <rect
                    x={displayX}
                    y={displayY}
                    width={displayW}
                    height={displayH}
                    fill={color}
                    opacity="0.1"
                  />
                  
                  {/* 标签 */}
                  <rect
                    x={displayX}
                    y={displayY}
                    width={Math.min(displayW, 120)}
                    height="24"
                    fill={color}
                    opacity="0.9"
                  />
                  <text
                    x={displayX + 4}
                    y={displayY + 16}
                    fill="white"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    L{layer.layer}: {layer.name.length > 10 ? layer.name.substring(0, 10) + '...' : layer.name}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
        
        {/* 图例 */}
        <div className="mt-4 flex flex-wrap gap-4">
          {layers.map((layer, index) => {
            const color = layerColors[layer.layer] || '#95a5a6'
            return (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-4 h-4 border-2 rounded"
                  style={{ 
                    borderColor: color,
                    backgroundColor: color + '20'
                  }}
                ></div>
                <span className="text-sm">
                  第{layer.layer}层: {getSourceTypeName(layer.sourceType)}
                </span>
              </div>
            )
          })}
        </div>
        
        {/* 坐标信息 */}
        <div className="mt-4 text-xs text-gray-600 space-y-1">
          <div>缩放比例: {(scaleX * 100).toFixed(1)}%</div>
          <div>显示尺寸: {Math.round(displayWidth)} × {Math.round(displayHeight)}</div>
        </div>
      </div>
    </div>
  )
}

export default CanvasPreview 