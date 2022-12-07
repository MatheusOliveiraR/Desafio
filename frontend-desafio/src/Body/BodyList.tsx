import { FunnelPlotOutlined, SearchOutlined } from '@ant-design/icons';
import { DatePicker, Form, InputRef, Select } from 'antd';
import { Button, Input, Space, Table, Popconfirm } from 'antd';
import type { ColumnsType, ColumnType} from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import React, { useRef, useState, useEffect } from 'react';
import Highlighter from 'react-highlight-words';
import axios from 'axios'
import Modal from 'antd/es/modal/Modal';
import InputMask  from 'react-input-mask';

interface DataType {
  id: number;
  name: string;
  gender: string;
  birthDate: string;
  email: string;
  phoneNumber: string;
}
interface DataTypeSave {
  name: string;
  gender: string;
  birthDate: string;
  email: string;
  phoneNumber: string;
}

type DataIndex = keyof DataType;


const App: React.FC = () => {  

  const [form] = Form.useForm();
  const [email, setEmail] = useState('')
  const { Option } = Select;
  const [loading,setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [update, setUpdate] = useState(false);
  const [personUpdate, setPersonUpdate]= useState<any>();

  useEffect(() =>{
    setLoading(true)
    axios.get("http://localhost:8080/person")
    .then(response =>{
      setDataSource(response.data)
    })
  }, [])

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

    const handleDelete = (record: any) => {
      axios.delete("http://localhost:8080/person/"+record['email'])
      .then(response=>{
        alert("Pessoa "+ record['name'] +" deletado com sucesso!")        
        window.location.reload()
      })
      .catch((error)=>{
        alert(error.response.data)
      })
    };
  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  function handleUpdate(record: any): void { 
    setPersonUpdate({...record})
    setUpdate(true)    
  }

  

  function finish(value: any){  
    axios.put("http://localhost:8080/person/"+personUpdate.id, personUpdate)
      .then(()=>{
        alert("Atualizado com sucesso! telefone: " + personUpdate.phoneNumber)
        window.location.reload()
        setUpdate(false);
      })
      .catch((error)=>{
        alert(error.response.data + " ERROR") 
      }) 
  }

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Buscar ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Buscar
          </Button>
          <Button
            type="primary"
            size="small"
            icon={<FunnelPlotOutlined />}
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filtrar
          </Button>

          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Resetar
          </Button>

          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Fechar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<DataType> = [
    {
      title: 'Nome',
      dataIndex: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Idade',
      dataIndex: 'birthDate',
    },
    {
      title:'Genêro',
      dataIndex: 'gender',
    },
    {
      title: 'Telefone',
      dataIndex: 'phoneNumber',
    },
    {
      title: "Ações",
      dataIndex:'',
      render: (record) =>
      dataSource.length >= 1 ? (
        <><Popconfirm title="Você tem certeza que deseja deletar essa pessoa?" onConfirm={() => handleDelete(record)}>
            <a>Deletar</a>
          </Popconfirm>
          <Popconfirm  title="Você tem certeza que deseja editar essa pessoa?" onConfirm={() => {
            handleUpdate(record)}} >
              <a style={{paddingLeft:15}}>Editar</a>
            </Popconfirm></>
      ) : null,
    },
  ];

  return (
    <div>
      <header>
        <Table columns={columns} dataSource={dataSource}></Table>
        <Modal title="Editando" open={update} onCancel={()=>{setUpdate(false)}}
        okButtonProps={{ style: { display: 'none' } }}
        > 
              <Form form={form}  name = "control-hooks" onFinish={finish}>
                <Form.Item label= "Nome completo" rules={[{required: true}]}>
                  <Input value={[personUpdate?.name]} onChange={(e)=>{
                    setPersonUpdate((pre: any)=>{
                      return {...pre, name:e.target.value}
                    })
                  }}></Input>
                </Form.Item>
                <Form.Item label= "Genêro">
                  <Select placeholder={personUpdate?.gender}>
                  <Option value="Masculino" >Masculino</Option>
                  <Option value="Feminino">Feminino</Option>
                  <Option value="Outro">Outro</Option>
                  </Select>
                </Form.Item>
                <Form.Item label = "Data de nascimento">
                  <DatePicker picker='date'
                  placeholder= {personUpdate?.birthDate}
                   format={"DD/MM/YYYY"}
                  ></DatePicker>
                </Form.Item>
                <Form.Item
                label='email'
                rules={[{type:'email',message: "Este email não é valido"}]}>
                  <Input value={[personUpdate?.email]} onChange={(e)=>{
                    setPersonUpdate((pre: any)=>{
                      return {...pre, email:e.target.value}
                    })
                  }}></Input>                  
                </Form.Item>
                <Form.Item label = "Telefone"  rules={[{type:'number'}]}>
                  <InputMask style={{borderColor:"#d9d9d9",}}
                   mask="(99) 99999-9999" value={personUpdate?.phoneNumber} onChange={(e)=>{
                    setPersonUpdate((pre: any)=>{
                      return {...pre, phoneNumber:e.target.value}
                    })
                  }}
                  />
                  {/* <Input type='phone' value={[personUpdate?.phoneNumber]} onChange={(e)=>{
                    setPersonUpdate((pre: any)=>{
                      return {...pre, phoneNumber:e.target.value}
                    })
                  }}></Input> */}
                </Form.Item>
                <Form.Item>
                  <Button type='primary' htmlType='submit'>Salvar</Button>
                  </Form.Item>
              </Form>
        </Modal>
      </header>
    </div>
  );
};

export default App;


