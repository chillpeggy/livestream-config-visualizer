import React from 'react'

// 层级颜色映射 - 扩展到50种鲜明易分辨的颜色
const layerColors = [
  '#FF0080', // 鲜艳的粉红色
  '#00FF00', // 鲜绿色
  '#FF4500', // 橙红色
  '#00BFFF', // 深天蓝色
  '#FF1493', // 深粉红色
  '#32CD32', // 酸橙绿
  '#FFD700', // 金色
  '#FF6347', // 番茄红
  '#00CED1', // 深绿松石色
  '#DA70D6', // 兰花紫
  '#FF8C00', // 深橙色
  '#7FFF00', // 查特酒绿
  '#DC143C', // 深红色
  '#00FFFF', // 青色
  '#FF69B4', // 热粉红色
  '#ADFF2F', // 绿黄色
  '#FF4444', // 亮红色
  '#44FF44', // 亮绿色
  '#4444FF', // 亮蓝色
  '#FFFF44', // 亮黄色
  '#FF44FF', // 亮洋红色
  '#44FFFF', // 亮青色
  '#FF8844', // 亮橙色
  '#88FF44', // 亮黄绿色
  '#4488FF', // 亮蓝紫色
  '#FF4488', // 亮玫瑰色
  '#88FF88', // 亮薄荷绿
  '#8844FF', // 亮紫色
  '#FFAA44', // 亮桃色
  '#44FFAA', // 亮春绿色
  '#AA44FF', // 亮紫罗兰色
  '#FF44AA', // 亮粉紫色
  '#AAFF44', // 亮柠檬绿
  '#44AAFF', // 亮天蓝色
  '#FF6600', // 深橙色
  '#6600FF', // 深紫色
  '#00FF66', // 深春绿色
  '#FF0066', // 深玫瑰色
  '#66FF00', // 深黄绿色
  '#0066FF', // 深蓝色
  '#FF3366', // 深粉红色
  '#33FF66', // 深薄荷绿
  '#6633FF', // 深蓝紫色
  '#FF6633', // 深珊瑚色
  '#66FF33', // 深柠檬绿
  '#3366FF', // 深钴蓝色
  '#FF9933', // 深金橙色
  '#33FF99', // 深海绿色
  '#9933FF', // 深紫罗兰色
  '#FF3399'  // 深洋红色
]

// 统一的颜色获取函数
const getLayerColor = (layerIndex) => {
  if (layerIndex < layerColors.length) {
    return layerColors[layerIndex]
  }
  // 如果超出预定义颜色数量，使用循环模式
  return layerColors[layerIndex % layerColors.length]
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
              const color = getLayerColor(layer.layer)
              
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
                  
                  {/* 标签 - 精确对齐到图层边框左上角 */}
                  <text
                    x={displayX + 2}
                    y={displayY + 14}
                    fill={color}
                    fontSize="14"
                    fontWeight="bold"
                    style={{
                      textShadow: '2px 2px 4px rgba(0,0,0,1), -1px -1px 2px rgba(0,0,0,1), 1px -1px 2px rgba(0,0,0,1), -1px 1px 2px rgba(0,0,0,1)'
                    }}
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
            const color = getLayerColor(layer.layer)
            return (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-4 h-4 border-2 rounded"
                  style={{ 
                    borderColor: color,
                    backgroundColor: color + '20'
                  }}
                ></div>
                <span className="text-sm" style={{ color: color }}>
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