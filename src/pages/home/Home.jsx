import React, { useState } from 'react';
import { Button as UIButton, Header, Icon, Modal, Input } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router';

import Button from '../../components/button/Button';
import './home.css';

const Home = () => {

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const handleChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // sample address : 0x0beed7099af7514ccedf642cfea435731176fb02

    const walletAddress = address;
    const baseUrl = 'https://eth-mainnet.g.alchemy.com/v2/N8Wq75PBsB18E4ZpHi11AhyGXCsmmO3Z';
    const url = `${baseUrl}/getNFTs/?owner=${walletAddress}`;

    const config = {
      method: 'get',
      url: url,
    };

    axios(config)
      .then((res) => {
        alert('Successfully fetched NFTs');
        if (res.data) {
          setLoading(false);
          setAddress('');
          setOpen(false);
          console.log(res.data);
          localStorage.setItem('address', address);
          localStorage.setItem('nfts', JSON.stringify(res.data.ownedNfts));
          navigate('/dashboard');
        }
      })
      .catch((err) => {
        alert('Error', err);
        setLoading(false);
        setAddress('');
        setOpen(false);
      });
  };

  return (
    <>
      <div className='container'>
        <div className="content">
          <h1 className="title">
            Welcome to NFTs Market Place App!
          </h1>
          <p className="description">
            This is a simple app that allows you to access and buy NFTs.
          </p>
        </div>
        <Button type='inverted' text="Get Started" onClick={handleOpen} />
      </div>
      <Modal
        closeIcon
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size='tiny'
      >
        <Header>
          <Icon name='write' />
          Provide Your Address
        </Header>
        <Modal.Content>
          <Input iconPosition='left' placeholder='0x00000000'>
            <Icon name='at' />
            <input
              value={address}
              onChange={handleChange}
            />
          </Input>
        </Modal.Content>
        <Modal.Actions>
          <UIButton
            color='red'
            disabled={loading}
            onClick={() => setOpen(false)}
          >
            <Icon name='remove' /> Close
          </UIButton>
          <UIButton
            color='green'
            disabled={address === ''}
            onClick={handleSubmit}
          >
            {loading ? <>
              <Icon name='spinner' loading /> Loading
            </> : (<>
              <Icon name='checkmark' /> Continue
            </>)}
          </UIButton>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default Home;