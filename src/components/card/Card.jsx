import React, { useState } from 'react';
import { Button, Header, Image, Modal, Icon } from 'semantic-ui-react';


import './card.css';

const Card = (props) => {

    const [open, setOpen] = useState(false);

    const handleBuy = () => {
        alert('Buy');
    };

    return (
        <>
            <div className='card' onClick={() => setOpen(true)}>
                <div className='card-image'>
                    <img src={props.thumbnail} alt='nft' />
                </div>
                <div className="card-nft-data">
                    <h2 className="nft-title">{props.nftTitle}</h2>
                    <div className="nft-amount">
                        <div className="floor">
                            <h3>FLOOR</h3>
                            <span className='floor-amount'>{props.floorAmount} ETH</span>
                        </div>
                        <div className="balance">
                            <h3>BALANCE</h3>
                            <span className='balance-amount'>{props.balanceAmount} ETH</span>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                closeIcon
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
            >
                <Modal.Header>{props.nftHeader}</Modal.Header>
                <Modal.Content image>
                    <Image size='medium' src={props.nftImg} wrapped />
                    <Modal.Description>
                        <Header>Owner Address</Header>
                        <p>
                            {props.onwerAddress + '  '}
                            <Icon
                                style={{
                                    color: '#356EFF',
                                    cursor: 'pointer'
                                }}
                                name='copy'
                                onClick={() => {
                                    navigator.clipboard.writeText(props.onwerAddress); 
                                    alert('Copied');
                                }}
                            />
                        </p>
                        <Header>Description</Header>
                        <p>
                            {props.nftDescription}
                        </p>

                        <Header>Token type</Header>
                        <p>{props.tokenType}</p>

                        <Header>Last time updated</Header>
                        <p>{props.lastUpdated}</p>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        color='blue'
                    >
                        <a
                            style={{
                                color: 'white',
                            }}
                            href={'https://opensea.io/assets?search[query]='+ props.openSeaLink}
                            target='_blank' rel="noreferrer"
                        >
                            Buy Now <Icon name='right chevron' />
                        </a>
                    </Button>
                </Modal.Actions>
            </Modal>
        </>
    );
};

export default Card;