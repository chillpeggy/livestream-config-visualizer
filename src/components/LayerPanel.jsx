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

// 单个层级信息组件
function LayerItem({ layer }) {
  const color = getLayerColor(layer.layer)
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
          <span className="font-semibold" style={{ color: color }}>
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