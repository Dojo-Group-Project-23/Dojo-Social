import React from 'react'


const Footer = () => {
    return (
        <footer className="text-center">
            <div className="container text-muted flex-grow-0 py-4 py-lg-5" style={{width: 'auto'}}>
                <ul className="list-inline">
                    <li className="list-inline-item me-4"><a className="link-secondary" href="#">LinkA</a></li>
                    <li className="list-inline-item me-4"><a className="link-secondary" href="#">LinkB</a></li>
                    <li className="list-inline-item"><a className="link-secondary" href="#">LinkC</a></li>
                </ul>
                <ul className="list-inline">
                </ul>
                <p className="mb-0">Copyright © 2023 Brand</p>
            </div>
        </footer>
    )
}

export default Footer