import React, {useEffect, useState} from 'react';
import {ListGroup} from "react-bootstrap";
import {IBoard} from "../models";
import Modal from "../components/Modal";
import useModal from "../hooks/useModal";

function BoardsPage() {
    const [boards, setBoards] = useState<IBoard[]>([]);
    const [loading, setLoading] = useState(false)
    const { isOpen, toggle } = useModal();


    const boardData: IBoard = {
        title: '',
        description: ''
    }
    useEffect(() => {
        setLoading(true);
        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set('Content-Type', 'application/json');
        requestHeaders.set('Authorization', `Bearer ${String(localStorage.getItem('token'))}`)
        const fetchData = async () => {
            const responseLogin = await fetch('https://hidden-chamber-35395.herokuapp.com/boards', {
                method: 'GET',
                headers: requestHeaders
            });
            const data = await responseLogin.json()
            if (responseLogin.ok) {
                setBoards(data)
            }
            setLoading(false)
        }
        fetchData();
    }, [])
    if (loading) {
        return <div>Loading...</div>;
    }

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        // if(value.trim().length === 0){
        //     setError('Please Enter valid title...')
        //     return
        // }
        boardData.title = value;
        const response = await axios.post<IProduct>('https://fakestoreapi.com/products', productData)
        onCreate(response.data)
    }

    return (
        <div className="container">
            <ListGroup defaultActiveKey="#link1">
                {
                    boards.map((item) => (
                    <ListGroup.Item action href="#link1"  key = {item.id} className="mb-2">
                        {item.title}
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <button onClick={toggle}>Add New Board</button>
            <Modal isOpen={isOpen} toggle={toggle}>
                <h1 className='h2 mb-3 font-weight-normal'>Add new Board</h1>
                <form onSubmit={submitHandler}>
                    <input
                        className="form-control mb-2"
                        placeholder='Board title'
                        // value={}
                        // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogin(e.target.value)}
                        type="text"
                        autoFocus
                    />
                    <textarea
                        className='form-control mb-2'
                        placeholder='Board description'
                        // value={}
                        // onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        autoFocus
                    />
                    <div className="my-3">
                        <input className='btn btn-primary btn-lg w-100' type="submit" value="Add"/>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default BoardsPage;