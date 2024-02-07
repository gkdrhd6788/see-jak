import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useState, useRef } from "react";
import { PlusCircle } from "lucide-react";
import DnD from "./reactflow/DragAndDrop";
import CharList from "./CharList";
import CharAdd from "./CharAdd";


export default function CharTab() {

  // const [capId, setCapId] = useState("")
  // const 
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    // url: ""
   
  });
  const { name, description } = inputs;
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "도지",
      tag: ["doge", "currency", "meme"],
      url: "data:image/jpeg;base64,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",
      description: "왈왈"
    },
    {
      id: 2,
      name: "페페",
      tag: ["pepe", "sad", "meme"],
      url: "https://images.chosun.com/resizer/OXrnN3OlFesXmgmLyS3_FulhAts=/600x600/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/UVBJZL3RXAB36BDSHVM3MW2WNY.jpg",
      description: "SAD",
    },
    {
      id: 3,
      name: "페페2",
      tag: ["pepe", "happy", "meme"],
      url: "https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/876/d7fd78748ae385999dfe54560819c3d7_res.jpeg",
      description: "SAD",
    },
    {
      id: 4,
      name: "루피",
      tag: ["pink", "ambition", "meme"],
      url: "data:image/jpeg;base64,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",
      description: "군침",
    },
    {
      id: 5,
      name: "?",
      tag: ["? ? ?"],
      url: "data:image/jpeg;base64,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",
      description: "? ?",
    }
  ] || []);

  const nextId = useRef(4);

  const onCreate = () => {
    const user = {
      id: nextId.current,
      tag: [],
      name,
      description,
      url : ""
    };
    setUsers([...users, user]);

    setInputs({
      name: "",
      description: "",
      url: "",
    });
    nextId.current += 1;
  };

  const [selectedIdx, setSelectedIdx] = useState('');

  const onIdxChange = (idx) => {
    setSelectedIdx(idx);
  };
  
  

  return (
    <div className="flex items-center justify-center w-full h-full p-2 mt-2 border rounded shadow-md">
      <Card className="box-border w-full h-full">
        <div className="box-border flex flex-row h-full p-3">
          <div className="box-border w-2/3 m-2 text-2xl font-semibold border-r h-11/12">
            인물 관계도
            <DnD users={users} idx={selectedIdx}/>
          </div>
          <div className="flex flex-col w-1/3">
            <div className="flex justify-between">
              <div className="box-border w-1/2 m-2 text-2xl font-semibold h-11/12">
                인물 목록
              </div>
              <CharAdd name={name} description={description} onChange={onChange} onCreate={onCreate} key={name}  />
            </div>
            <div className="box-border w-full h-full m-2">
              <CharList users={users} key={name}  onIdxChange={(idx) => onIdxChange(idx)} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
