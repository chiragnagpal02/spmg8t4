import React from 'react'
import { useState } from 'react'
import Modal from './Modal';
import './App.css'
import userlogo from '../../assets/user.png'
import threedot from '../../assets/threedot.png'

const ViewMatch = () => {

    return (
        <>

        <div class='bg-[#D3D3D3] h-[60px] font-bold text-lg flex justify-center items-center mb-[50px]'>

            <span class='text-dark'>
                Head, Talent Attraction
            </span>

        </div>

        <div>
        <table width="90%%" class="styled-table">
    <thead>
        <tr>
            <th width="5%">Name</th>
            <th width='20%'></th>
            <th width='20%'>Application Date</th>
            <th width='10%'>Skill Match</th>
            <th width='40%'>Skill Sets</th>
            <th width='5%'></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <button>
                    <img className='mx-3' width='30px' src={userlogo} alt=""  />
                </button>
            </td>
            <td>
                <p>
                    Emery Torff
                </p>

                <p class='email'>
                    thekdfisher@email.com
                </p> 
            </td>
            <td>Apr 12, 2023|09:32AM</td>
            <td>67%</td>
            <td>Python Programming</td>
            <td>
                <button>
                    <img width="30px" class='dots' src={threedot} alt="" />
                </button>
            </td>
        </tr>

        <tr>
            <td>
                <button>
                    <img className='mx-3' width='30px' src={userlogo} alt=""  />
                </button>
            </td>
            <td>
                <p>
                    Emery Torff
                </p>

                <p class='email'>
                    thekdfisher@email.com
                </p> 
            </td>
            <td>Apr 12, 2023|09:32AM</td>
            <td>67%</td>
            <td>Python Programming</td>
            <td>
                <button>
                    <img width="30px" class='dots' src={threedot} alt="" />
                </button>
            </td>
        </tr>

        <tr>
            <td>
                <button>
                    <img className='mx-3' width='30px' src={userlogo} alt=""  />
                </button>
            </td>
            <td>
                <p>
                    Emery Torff
                </p>

                <p class='email'>
                    thekdfisher@email.com
                </p> 
            </td>
            <td>Apr 12, 2023|09:32AM</td>
            <td>67%</td>
            <td>Python Programming</td>
            <td>
                <button>
                    <img width="30px" class='dots' src={threedot} alt="" />
                </button>
            </td>
        </tr>

        <tr>
            <td>
                <button>
                    <img className='mx-3' width='30px' src={userlogo} alt=""  />
                </button>
            </td>
            <td>
                <p>
                    Emery Torff
                </p>

                <p class='email'>
                    thekdfisher@email.com
                </p> 
            </td>
            <td>Apr 12, 2023|09:32AM</td>
            <td>67%</td>
            <td>Python Programming</td>
            <td>
                <button>
                    <img width="30px" class='dots' src={threedot} alt="" />
                </button>
            </td>
        </tr>
    </tbody>
</table>
        </div>
    </>   
  )
}

export default ViewMatch