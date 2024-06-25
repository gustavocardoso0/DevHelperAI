import React from 'react';
import { TbBrandOpenai } from "react-icons/tb";
import '../App.css';

function Footer() {
  return (
<footer className='min-vw-100'>
    <div className='bg-light pb-2'>
        <div className='container text-center pt-1'>
            <div className='row'>
                <div className='col'>
                    <p className='text dark fs-5 my-3'>
                        <strong>Contato do Suporte:</strong>
                    </p>
                    <p>
                        <a href='#' className='fs-6'> DevHelperAISuporte@gmail.com</a>
                    </p>
                </div>
                <div className='col'>
                    <p className="text-dark fs-5 my-3 " href="#"><strong>DevHelper AI</strong></p>
                    <p className='fs-6 my-4'><strong>© Copyright - 2024</strong> </p>
                </div>
                <div className='col my-3'>
                    <TbBrandOpenai size={40} />
                    <br />
                    <p className='fs-5'><strong>OpenAI</strong></p>
                </div>
            </div>
        </div>
    </div>
</footer>

  );
}

export default Footer;