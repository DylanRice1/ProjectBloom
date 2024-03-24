import React from 'react';

export const containerStyle = {
        position: 'relative',
        overflow: 'hidden',
};

export const overlayStyle = {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.5,
    zIndex: 1,
};

export const fontStyle = {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'left',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 2,
};

export const imgStyle = {
    width: '100vw',
    height: '100vh',
    objectFit: 'cover',
};