import React from 'react'

// 层级颜色映射（与CanvasPreview保持一致）
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

// 单个层级信息组件
function LayerItem({ layer }) {
  const color = layerColors[layer.layer] || '#95a5a6'
  const [x, y, width, height] = layer.canvasOverlapRect
  
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      {/* 层级标题 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div 
            className="w-4 h-4 rounded"
            style={{ backgroundColor: color }}
          ></div>
          <span className="font-semibold text-gray-900">
            第{layer.layer}层
          </span>
        </div>
        <span className="text-sm text-gray-500">
          {getSourceTypeName(layer.sourceType)}
        </span>
      </div>
      
      {/* 层级信息 */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">名称:</span>
          <span className="font-medium text-gray-900 text-right max-w-40 truncate" title={layer.name}>
            {layer.name}
          </span>
        </div>
        
        {layer.exeName && (
          <div className="flex justify-between">
            <span className="text-gray-600">进程:</span>
            <span className="font-medium text-gray-900">
              {layer.exeName}
            </span>
          </div>
        )}
        
        <div className="flex justify-between">
          <span className="text-gray-600">画面占比:</span>
          <span className="font-medium text-gray-900">
            {(layer.canvasOverlap * 100).toFixed(1)}%
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">原始占比:</span>
          <span className="font-medium text-gray-900">
            {(layer.overlap * 100).toFixed(1)}%
          </span>
        </div>
        
        {layer.opacity !== undefined && layer.opacity >= 0 && (
          <div className="flex justify-between">
            <span className="text-gray-600">透明度:</span>
            <span className="font-medium text-gray-900">
              {layer.opacity}%
            </span>
          </div>
        )}
        
        {/* 坐标信息 */}
        <div className="pt-2 border-t border-gray-100">
          <div className="text-gray-600 text-xs mb-1">位置信息:</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">X:</span>
              <span>{Math.round(x)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Y:</span>
              <span>{Math.round(y)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">宽:</span>
              <span>{Math.round(width)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">高:</span>
              <span>{Math.round(height)}</span>
            </div>
          </div>
        </div>
        
        {/* 其他属性 */}
        {layer.isSoftware && (
          <div className="flex justify-between">
            <span className="text-gray-600">软件源:</span>
            <span className="text-green-600 font-medium">是</span>
          </div>
        )}
        
        {layer.deviceId && (
          <div className="flex justify-between">
            <span className="text-gray-600">设备ID:</span>
            <span className="font-medium text-gray-900 text-xs">
              {layer.deviceId}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

function LayerPanel({ layers }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">层级信息</h2>
        <span className="text-sm text-gray-600">
          共 {layers.length} 层
        </span>
      </div>
      
      <div className="space-y-4">
        {layers.map((layer, index) => (
          <LayerItem key={index} layer={layer} />
        ))}
      </div>
      
      {layers.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          暂无层级信息
        </div>
      )}
    </div>
  )
}

export default LayerPanel 