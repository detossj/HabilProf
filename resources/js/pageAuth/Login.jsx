import React from 'react'

const Login = () => {
    return (
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-sm-4'>
              <div className='card mt-5 mb-5'>
                <div className='card-body'>
    
                  <h1 className='text-center fw-bolder'>Login</h1>
    
                  <input type="text" className='form-control mt-3' placeholder='Email:' required/>
    
                  <input type="password" className='form-control mt-3' placeholder='Password:' required/>
    
                  <button  className='btn btn-primary w-100 mt-3'>SEND</button>
    
                  <p className='text-center mt-3'></p>

                </div>
              </div>
            </div>
          </div>
        </div>
      )
}

export default Login