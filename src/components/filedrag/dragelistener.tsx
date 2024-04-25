import { createContext, useState } from "react";
import { getBackgroundImageUrl } from "../../utils";
import { CheckValueProps, ChooseImgProps, FiledragProps } from "../interface/filedrag";
export const HandleElementContext = createContext((e: any, select: boolean) => { })
export const ChooseElementContext = createContext<ChooseImgProps[]>([])
export const SetImgListContext = createContext<React.Dispatch<React.SetStateAction<ChooseImgProps[]>>>(() => { })
export const setCheckValueArrContext = createContext<React.Dispatch<React.SetStateAction<{ id: string, type: string }[]>>>(() => { })

const DrageListener: React.FC<FiledragProps> = ({ children }) => {
  const [imglist, setImglist] = useState<ChooseImgProps[]>([])
  const [checkValueArr, setCheckValueArr] = useState<{ id: string, type: string }[]>([])
  const [url, setUrl] = useState<string | null>('')

  const startDrag = (e: any) => {
    if (e.target.role == 'button') {
      let id = e.target.id
      let ImgeUrl = getBackgroundImageUrl(id)
      let type = e.target.dataset.type
      let arr = checkValueArr.filter((item) => {
        return item.id == id
      })
      if (arr.length > 0) {
        e.dataTransfer.setData("text/plain", JSON.stringify({ ZTimeAsset: checkValueArr }))
      } else {
        setImglist([{ url: ImgeUrl, id }])
        setCheckValueArr([{ id, type }])
        e.dataTransfer.setData("text/plain", JSON.stringify({ ZTimeAsset: [{ id, type }] }))
      }
      if (!url) {
        let eurl = getBackgroundImageUrl(e.target.id)
        setUrl(eurl)
      }
    }
  }

  const dragOver = (e: any) => {
    e.preventDefault()
  }

  const stopDrag = (e: any) => {
    e.preventDefault()
    const data = e.dataTransfer.getData("text/plain");
    setUrl('')
  }

  const handleElement = (e: any, select: boolean) => {
    let ImgeUrl = getBackgroundImageUrl(e.target.id)
    let id = e.target.id
    let type = e.target.dataset.type
    if (e.ctrlKey) {
      if (!select) {
        setImglist(prevImglist => [...prevImglist, { url: ImgeUrl, id }]);
        setCheckValueArr(prevArr => [...prevArr, { id, type }])
      } else {
        setImglist(prevImglist => prevImglist.filter(item => item.id !== id));
        setCheckValueArr(prevArr => prevArr.filter(item => item.id !== id))
      }
    } else {
      setImglist([{ url: ImgeUrl, id }])
      setCheckValueArr([{ id, type }])
    }
  }
  return (
    <HandleElementContext.Provider value={handleElement}>
      <ChooseElementContext.Provider value={imglist}>
        <SetImgListContext.Provider value={setImglist}>
          <setCheckValueArrContext.Provider value={setCheckValueArr}>
            <div className='Eventlistener'
              onDragStart={startDrag}
              onDrop={stopDrag}
              onDragOver={dragOver}
            >    {children}
              <div>
              </div>
            </div>
          </setCheckValueArrContext.Provider>
        </SetImgListContext.Provider>
      </ChooseElementContext.Provider>
    </HandleElementContext.Provider>
  )
}
export default DrageListener

