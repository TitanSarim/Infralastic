import './device-cmd.scss';
import React, {useState} from "react";
import {useSearchParams, useNavigate} from "react-router-dom";
import {executeSaltCommands} from "@infralastic/global-state";
import {toast} from "react-toastify";
import { IconButton } from '@mui/material';
import { BsArrowLeftCircleFill } from 'react-icons/bs';

const DeviceCmd = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [terminalData, setTerminalData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const minionId: any = searchParams.get("id");
  const router = useNavigate()

  const handleInput = (event: any) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  function handleSubmit() {
    const formData = {
      minionId: minionId,
      command: input
    };
    executeSaltCommands(formData).then((res: any) => {
      if (res?.data?.data === false) {
        setOutput('Command not recognized')
      } else {
        toast.success(res?.data?.data?.msg);
        const responseData = res?.data?.data || "";
        const lines = responseData?.split("\n").filter((line: any) => line.trim() !== "");
        setTerminalData(lines);
        setOutput((prevOutput) => `${prevOutput}${input}\n`);
        setInput('');
      }
    });
  }

  const handleInputChange = (event: any) => {
    setInput(event.target.value);
  };

  return (
    <div className='p-2'>
      <div className='d-flex position-relative justify-content-center'>
        <IconButton
          className='position-absolute start-0'
          size="large"
          aria-label="back"
          onClick={() => router(-1)}
        >
          <BsArrowLeftCircleFill size={35} />
        </IconButton>
        <h3 className='theme-font py-3 text-center mb-0'>Command Prompt</h3>
      </div>
      <div className="terminal">
        <pre className="output">
          {output}
          {terminalData.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </pre>
        <input
          className="input"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleInput}
          autoFocus
        />
      </div>
    </div>
  );
};
export default DeviceCmd;
