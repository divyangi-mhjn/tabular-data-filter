import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css'

const App = () => {
  const [alldata, setAlldata] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [mydata, setMydata] = useState([]);

  useEffect(() => { userApi() }, [])
  const userApi = () => {
    axios.get('/api/users')
    .then((res) => {
      setHeaders(Object.keys(res.data[0]));
      setMydata(res.data)
      setAlldata(res.data)
    })
    .catch(err => {
      console.log(err);
    });
  }
  const header = () => {
    return (
      headers.map((headerList, index) => <th key={headerList}>{headerList.toUpperCase()}</th>)
    )
  }

  const createColumns = (rowData) => {
    return (

      headers.map((headerList) => {
        if ((headerList === 'company') || (headerList === 'address')) {

          const appendedData = append(rowData[headerList])
          return (<td key={'row_' + headerList}>{appendedData}</td>)
        }
        else {
          return (<td key={'row_' + headerList}>{rowData[headerList]}</td>)
        }

      })
    )
  }
  const tableBody = () => {
    return (
      alldata.map((DataList, index) => <tr>{createColumns(DataList)}</tr>)
    )
  }

  const append = (data) => {
    let col = ''
    Object.keys(data).map((all) => {
      if (all !== 'geo') {
        return (col = col + ',' + data[all])
      }
      else {
        Object.keys(data[all]).map((i) => col = col + ',' + i + ' - ' + data[all][i])
        return col
      }
    }
    )
    return col.substring(1)
  }

  const filterColumns = () => {
    return (headers.map((key) => <td key={'cl_' + key}><input type="text" id={key} name={key} onKeyUp={filterApi} /></td>)
    )
  }

  const filterApi = (event) => {
    const id = event.target.id;
    let arr = []
    if ((id.toString() === "address") || (id.toString() === "company")) {
      arr = mydata.filter((dataList) => {
        return (append(dataList[id]).toString().toLowerCase().indexOf(event.target.value.toString().toLowerCase()) >= 0)
      })

    }
    else {
      arr = mydata.filter((dataList) => dataList[id].toString().toLowerCase().indexOf(event.target.value.toString().toLowerCase()) >= 0)

    }
    setAlldata(arr)
  }

  return (<div className='App'>
    <div className='App-header'>Assignment for pwc</div>
    <table id='user'>
      <tr> {header()} </tr>
      <tr>{filterColumns()}</tr>
      {tableBody()}
    </table>
  </div>)

}

export default App