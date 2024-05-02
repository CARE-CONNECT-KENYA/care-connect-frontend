import SignUpForm from '@/app/Components/SignUpForm'
import React from 'react'

function UserSignup() {
  return (
    <div>
      {/* Side containing the form */}
      <div>
        <SignUpForm />
        
      </div>
      {/* Side containing the image */}
      <div>
        <h3>Welcome</h3>
      </div>
    </div>
  )
}

export default UserSignup
