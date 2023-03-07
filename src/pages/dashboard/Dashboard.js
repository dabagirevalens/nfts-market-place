import React from 'react';
import { Icon } from 'semantic-ui-react';

import Card from '../../components/card/Card';
import './dashboard.css';

const Dashboard = () => {

  const nfts = JSON.parse(localStorage.getItem('nfts'));
  const address = localStorage.getItem('address');

  if (!address) {
    window.location.href = '/';
  }


  return (
    <div className='main-container'>
      <div className="main-container-title">
        <div className='c-title' >
          <h1
            style={{
              color: '#356EFF'
            }}
          >NFTs Owned By:</h1>
        </div>
        <div className='address' >
          <h3>@{address} <Icon
            style={{
              color: '#356EFF',
              cursor: 'pointer'
            }}
            name='copy'
            onClick={() => {
              navigator.clipboard.writeText(address);
              alert('Copied');
            }}
          /> </h3>

        </div>
      </div>
      <div className="nfts">
        {(nfts && nfts.length > 0) ? nfts.map((nft, index) => (
          <Card
            key={index}
            thumbnail={nft.media[0].thumbnail ? nft.media[0].thumbnail : nft.media[0].raw}
            nftTitle={nft.title}
            floorAmount={nft.contractMetadata.openSea.floorPrice}
            balanceAmount={nft.balance}
            nftImage={nft.media[0].raw}
            nftHeader={nft.contractMetadata.openSea.collectionName + ': ' + nft.title}
            nftImg={nft.media[0].raw}
            nftDescription={nft.description ? nft.description : 'No Description'}
            onwerAddress={nft.contract.address}
            lastUpdated={nft.timeLastUpdated}
            tokenType={nft.contractMetadata.tokenType}
            openSeaLink={nft.contractMetadata.openSea.collectionName}
          />
        )) : (<h1>No NFTs Found</h1>)}
      </div>
    </div>
  );
};

export default Dashboard;