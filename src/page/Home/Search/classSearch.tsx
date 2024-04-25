import { useContext, useEffect, useState } from "react";
import Search from "./Search"
import { Label, LabelSearchProps } from "./interface";
import { ClassNameContext } from "..";


const ClassSearch: React.FC<LabelSearchProps> = ({ setSearch, search }) => {
  const { className } = useContext(ClassNameContext)

  const [classLabel, setClassLabel] = useState<Label[]>([]);
  useEffect(() => {
    const body = JSON.stringify({
      "ClassName": className
    })
    async function post() {
      const res = await fetch(`http://192.168.0.54/TagManager/GetClassTagTreeForWeb`, { method: 'POST', body });
      const jsonData = await res.json().then((res) => {
        let _classLabel = res.Message.ClassTagTreeItems;
        setClassLabel(_classLabel)
        return res
      })
      return jsonData
    }
    // post()
  }, [className])
  return (
    <Search search={search} setSearch={setSearch} labels={classLabel} tittle={'class'} />
  )
}

export default ClassSearch