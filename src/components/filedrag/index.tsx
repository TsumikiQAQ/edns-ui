import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { BrowserBindingProps, CEFWindow, FiledragProps } from '../interface/filedrag';
import { calculateDistance, getBackgroundImageUrl } from '../../utils';
const Filedrag: React.FC<FiledragProps> = ({ children }) => {
  const [imglist, setImglist] = useState<string[]>([])
  const [zitime, setZitime] = useState<BrowserBindingProps>()
  const [ImgeUrls, setImgeUrls] = useState<string[]>([])
  const [IDs, setIDs] = useState<string[]>([])
  const [Types, setTypes] = useState<string[]>([])
  const [imgListRender, setImgListRender] = useState<ReactNode>('pleace choose img')
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [url, setUrl] = useState<string | null>('')
  const [childshow, setChildshow] = useState(false)
  const startDrag = useCallback((e: any) => {
    if (e.target.role == 'button') {
      setDragging(true);
      if (!url) {
        let eurl = getBackgroundImageUrl(e.target.id)
        setUrl(eurl)
      }
      setStartPos({
        x: e.clientX,
        y: e.clientY,
      });
    } else {
      return
    }
  }, [])
  const duringDrag = useCallback((e: any) => {

    if (dragging) {

      setPosition({
        x: e.clientX,
        y: e.clientY,
      })
      let px = position.x
      let py = position.y
      let sx = startPos.x
      let sy = startPos.y

      if (calculateDistance(px, py, sx, sy) > 50) {
        setChildshow(true)
        zitime && zitime.dragstarted(ImgeUrls, IDs, Types)
      }
    }
  }, [dragging, startPos]);

  const stopDrag = useCallback(() => {
    setUrl('')
    setChildshow(false)
    setDragging(false);
  }, []);

  const handleElement = (e: any) => {
    e.target.check = e.target.check == undefined ? true : !e.target.check
    let ImgeUrl = getBackgroundImageUrl(e.target.id)

    let ID = e.target.id
    let Type = e.target.dataset.type

    if (e.target.check) {
      setImglist(prevImglist => [...prevImglist, ImgeUrl]);
      setImgeUrls(prevUrls => [...prevUrls, ImgeUrl]);
      setIDs(prevIDs => [...prevIDs, ID]);
      setTypes(prevTypes => [...prevTypes, Type]);
    } else {
      setImglist(prevImglist => prevImglist.filter(item => item !== ImgeUrl));
      setImgeUrls(prevUrls => prevUrls.filter(item => item !== ImgeUrl));
      setIDs(prevIDs => prevIDs.filter(item => item !== ID));
      setTypes(prevTypes => prevTypes.filter(item => item !== Type));
    }
  }


  useEffect(() => {
    let imgListRender = imglist && imglist.map((item, index) => (<img src={item} alt="" key={index} />));
    setImgListRender(imgListRender)
  }, [imglist])
  useEffect(() => {
    if ((window as unknown as CEFWindow).ue) {
      let browserbinding = (window as unknown as CEFWindow).ue.browserbinding
      setImgListRender(`在window上已获取到BrowserBinding  | ${Object.keys(browserbinding)} `)
      setZitime(browserbinding)
    } else {
      setImgListRender(`window上不存在BrowserBinding${window}`)
    }
  }, [])
  return (
    <>
      <div className='Eventlistener'
        onMouseDown={startDrag}
        onMouseMove={duringDrag}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
      >


        <div
          role='button'
          id='child1'
          onClick={handleElement}
          data-type='img'
          style={{
            width: '100px',
            height: '100px',
            backgroundColor: 'red',
            position: 'absolute',
            cursor: 'move',
            left: `100px`,
            top: `100px`,
            userSelect: 'none',
            backgroundImage: "url('logo192.png')",
            backgroundSize: 'cover'
          }}

        >
        </div>
        <div
          onClick={handleElement}
          role='button'
          id='child2'
          data-type='img'
          style={{
            width: '100px',
            height: '100px',
            backgroundColor: 'red',
            position: 'absolute',
            cursor: 'move',
            left: `300px`,
            top: `100px`,
            userSelect: 'none',
            backgroundImage: "url('test.png')",
            backgroundSize: 'cover',
            backgroundBlendMode: 'multiply'
          }}

        >
        </div>
        {childshow && <div
          style={{
            width: '100px',
            height: '100px',
            backgroundColor: 'red',
            position: 'absolute',
            backgroundImage: `url(${url})`,
            backgroundSize: 'cover',
            left: `${position.x}px`,
            top: `${position.y}px`,
            userSelect: 'none',
            transform: 'translate(-50%, -50%)',
          }}>

        </div>}
        {children}
        <div>
          已选择元素
          {imgListRender}
        </div>
      </div>
    </>
  );
};

export default Filedrag;
