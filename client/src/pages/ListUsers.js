
import React from 'react'
import {Link} from 'react-router-dom'
import { useUsers } from '../context/usersContext'
import DataTable,{createTheme} from 'react-data-table-component'
import 'styled-components'

const columns = [
    {
        name:'ID',
        selector: row => row.id
    },
    {
        name:'NAME',
        selector: row => row.name
    },
    {
        name:'E-MAIL',
        selector: row => row.email
    }
]

//personalizacion de thema
createTheme('custom', {
    text: {
      primary: '#FCDAB7',
      secondary: '#F15412',
    },
    background: {
      default: '#1D2D50',
    },
    context: {
      background: '#151D3B',
      text: '#7D1E6A',
    },
    divider: {
      default: '#F7F7F7',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  }, 'dark');
  
  
export default function ListUsers() {
    const {users}=useUsers()
    const data=users;
   // console.log('listUsers',data);
  return (
    <div className='h-screen '>
        <div className='pt-5 float-right mx-5'>
        <Link
            to="/"
            className="text-gray-300 text-sm hover:text-gray-500 flex justify-end"
          >
            Go Home
          </Link>
        </div>
        <div className='my-15 py-15 bg-slate-700'>
            <h1 className='text-center text-5xl font-bold text-gray-500 pt-8 '>Listado de Usuarios</h1>
        </div>
        <div className='w-[1200px] m-auto p-16'>

        <DataTable 
            columns={columns}
            data={data}
            theme='custom'
            pagination
        />
        </div>
        
    </div>
  )
}
