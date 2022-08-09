import React from 'react'
import PaginationTable from '../paggination/PaginationTable'

export default function VentasTable({data}){
    return(
        <PaginationTable data={data} />
    )
}