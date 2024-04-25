// 获取div元素的背景图片url
export function getBackgroundImageUrl(elementId: string) {
    // 获取元素
    var element = document.getElementById(elementId);
    if (!element)  throw new Error('Element not exsit')     // 如果元素不存在，直接返回 null
    // 获取计算后的样式
    var style = window.getComputedStyle(element);
    // 提取背景图片 URL
    var backgroundImageUrl:string = style.backgroundImage.slice(4, -1).replace(/["']/g, "");
    if(backgroundImageUrl){
        return backgroundImageUrl;
    }else{
        throw new Error('backgroundImageUrl not exsit')
    }
  }
  
// 计算两个坐标的距离
export function calculateDistance(x1: number, y1: number, x2: number, y2: number) {
    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    return distance;
}

// 获取两个数之间的数
export function getNumberInTwoNumber(arr:number[]){
    let index1 = arr[0]
    let index2 = arr[1]
    let Arr = []
    let Index 
    if(index1 < index2){
    Index = index1
  }else {
      Index = index2; index2 = index1
    }
    for(let i = Index;i<=index2;i++){
      Arr.push(i)
    }    
    return Arr
}