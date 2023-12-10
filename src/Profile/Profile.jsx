import React from 'react'

export default function Profile({userData}) {

  return <>
    <div className=" row mt-5 position-relative d-flex justify-content-center">
      <div className=" profile text-center col-10">
        <img className='image w-100' src="https://scontent.fcai20-3.fna.fbcdn.net/v/t39.30808-6/269726068_1394187260978693_7625500759843877502_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=M1Jp3p9-Bh8AX-BypQh&_nc_ht=scontent.fcai20-3.fna&oh=00_AfBGmWei8JRzNr_S1TAYOoqDLg03ezGA7f0uwuFZDMKLKw&oe=63F5F6DE" alt="" />
        <h4 className=' mt-3'>Name : {userData.first_name} {userData.last_name}</h4>
        <h4>Age : {userData.age}</h4>
        <h4>email : {userData.email}</h4>
      </div>
    </div>
  </>
}
