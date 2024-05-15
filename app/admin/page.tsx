'use client'

import Wrapper from '@/components/Wrapper.component'
import Contexts from '@/components/Contexts.component'
import { AdminPanel } from '@/components/Admin'


const AdminPage = () => {

  return (
    <Contexts>
      <Wrapper>
        <AdminPanel/>
      </Wrapper>
    </Contexts>
  )
}

export default AdminPage
