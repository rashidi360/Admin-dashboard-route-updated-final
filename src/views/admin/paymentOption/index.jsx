import { Box } from '@chakra-ui/react'
import React from 'react'
//Pages
import FormPaymentOption from './components/FormPaymentOption'
import DataTable from './components/DataTablePaymentOption'

export default function PaymentOption() {
  return (
    <Box mt={20}>    
    <DataTable />
    {/* <FormPaymentOption /> */}
    </Box>
  )
}
