import React, { memo } from 'react';

const ColorLegend = ({
    overperforming,
    nodeColor,
}) => {
    if (!overperforming) {
        return (
            <div>
                {nodeColor === 'loss' ? <p style={{ fontSize: '0.75rem', color: 'black' }}>Darker = higher loss (% worse)</p> : <p style={{ fontSize: '0.75rem', color: 'black' }}>Darker = less accurate</p> }
                <div style={{ display: 'flex', flexDirection: 'row'}}>
                    <div className="legend" style={{
                        background: 'linear-gradient(to right, #FFF1EC, #F99075, #E83F36, #67000E)',
                        width: '90%',
                        height: '25px',
                        margin: '0 auto'
                    }}>
                        {nodeColor === 'loss' ? <p style={{ position: 'absolute', left: '0.75rem', top: '330px', fontSize: '0.75rem' }}>0%</p> : <p style={{ position: 'absolute', left: '0.75rem', top: '330px', fontSize: '0.75rem' }}>1.0</p>}
                        {nodeColor === 'loss' ? <p style={{ position: 'absolute', left: '9.5rem', top: '330px', fontSize: '0.75rem', color: 'white' }}>{'>100%'}</p> : <p style={{ position: 'absolute', left: '11rem', top: '330px', fontSize: '0.75rem', color: 'white' }}>0.0</p>}
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                {nodeColor === 'loss' ? <p style={{ fontSize: '0.75rem', color: 'black' }}>Darker = lower loss (% improv.)</p> : <p style={{ fontSize: '0.75rem', color: 'black' }}>Darker = more accurate</p> }
                <div style={{ display: 'flex', flexDirection: 'row'}}>
                    <div className="legend" style={{
                        background: 'linear-gradient(to right, #E3EEF9, #B5D4E9, #6EAED5, #1A64AA, #092F6B)',
                        width: '90%',
                        height: '25px',
                        margin: '0 auto'
                    }}>
                        {nodeColor === 'loss' ? <p style={{ position: 'absolute', left: '0.75rem', top: '330px', fontSize: '0.75rem' }}>0%</p> : <p style={{ position: 'absolute', left: '0.75rem', top: '330px', fontSize: '0.75rem' }}>0.0</p>}
                        {nodeColor === 'loss' ? <p style={{ position: 'absolute', left: '9.5rem', top: '330px', fontSize: '0.75rem', color: 'white' }}>{'>100%'}</p> : <p style={{ position: 'absolute', left: '11rem', top: '330px', fontSize: '0.75rem', color: 'white' }}>1.0</p>}
                    </div>
                </div>
            </div>
        )
    }
}

export default memo(ColorLegend);