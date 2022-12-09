import { Form, Button, Input, Select, DatePicker,} from 'antd'
import axios from 'axios';
import React, { useState, ChangeEvent} from 'react';
import moment from 'moment';
import InputMask  from 'react-input-mask';

const { Option } = Select;

const App: React.FC = () => {

    const dateFormat = 'DD/MM/YYYY';    
    const [form] = Form.useForm();  
    const [phone, setPhone] = useState("")

    
    
    function finish(value: any){            
        value["birthDate"] = moment(value.birthDate).format(dateFormat)
        axios.post("http://localhost:8080/person", value)
        .then(()=>{
            alert("Cadastro realizado com sucesso!")
            window.location.reload()
        })
        .catch((error)=>{
            alert(error.response.data)
        })       
    }; 
    
    const onChange=(e: ChangeEvent<HTMLInputElement> )=> {
        setPhone(e.target.value);
    }
            
  return (
    <Form form= {form} onFinish={finish}>
        <Form.Item name={['name']} label= "Nome completo" rules={[{required: true}]}
        >
            <Input placeholder='Nome completo'></Input>
        </Form.Item>

        <Form.Item name="gender" label="Genêro" rules={[{required: true}]}>
            <Select placeholder='Selecione seu sexo'   
            >                
                <Option value="Masculino" >Masculino</Option>
                <Option value="Feminino">Feminino</Option>
                <Option value="Outro">Outro</Option>
            </Select>
        </Form.Item>

        <Form.Item name={['birthDate']} label="Data de nascimento" rules={[{required: true}]}                  
        >
                <DatePicker picker="date" placeholder='Data de nascimento'
                  format={dateFormat}
                  ></DatePicker>      
        </Form.Item>

        <Form.Item
            name={['email']} label="email" rules={[
                {required: true},
                {type:'email',
                message:"Este email não é valido"}            
            ]}>   
            <Input></Input>
        </Form.Item>

        <Form.Item
            name={['phoneNumber']} label="Telefone" rules={[{required: true}]} initialValue={{["phoneInput"]: phone}}                        
        >
            <InputMask mask="(99) 99999-9999" name='phoneInput' onChange={onChange} />
        </Form.Item>
        <Button type="primary" htmlType="submit">Salvar</Button>
    </Form>
  )

}
export default App;