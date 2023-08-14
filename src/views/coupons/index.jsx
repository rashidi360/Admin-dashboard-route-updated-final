import { Box } from '@chakra-ui/react'
import React from 'react'

//Pages
import DataTableCoupon from './components/DatatableCoupon'

export default function Coupons() {
  return (
    <Box mt={20}>
      <DataTableCoupon />
    </Box>
  )
}
