import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

/* The following code is used to generate QR codes at will. This is a component that is rendered in Welcome.js */

function generateQRCode(param1, param2) {
  //if there is no household and people id, do not generate a qr code.
  if (!param1 && !param2) {
    return null;
  }


  //get the width of the entire screen and define screen size for small devices.
  const { width } = Dimensions.get('window');
  const isSmallScreen = width < 375;


  //get the code that will be used to generate the qr code. Define some sizing variables
  const code = param1 + "," + param2;
  const windowWidth = Dimensions.get('window').width;
  const qrCodeSize = isSmallScreen ? Math.floor(windowWidth * 0.4) : Math.floor(windowWidth * 0.3); 

  const logoSize = Math.floor(qrCodeSize * 0.3); 

  //style the qr code
  const qrCodeStyle = {
    marginTop: 20,
    marginBottom: 20,
    width: qrCodeSize,
    height: qrCodeSize,
  };


  //get the image of the logo for the qr code
  const logoLink = require('../images/ocmlogo-removebg-preview.jpg'); // Replace with the actual logo image path

  //return the qr code using the styles and sizing
  return (
    <>
        <View style={isSmallScreen? styles.qrcontainer : styles.largecontainer}>
        <QRCode value={code} size={qrCodeSize} style={qrCodeStyle} />
        
        <Image source={logoLink} style={[isSmallScreen ? styles.logosm : styles.logo, { width: logoSize, height: logoSize }]} />
        </View> 
   </>
  );
}


//styles for the qr codes, different screen sizes call for different qr code sizes.
const styles = StyleSheet.create({
    qrcontainer: {
      flex: 1,
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      bottom: '5%',
      left: '10%',
      backgroundColor: 'white',
      height: Math.floor(Dimensions.get('window').width * 0.4) + 20,
      width: Math.floor(Dimensions.get('window').width * 0.4) + 20,
    },
    largecontainer: {
      flex: 1,
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      bottom: '5%',
      left: '10%',
      backgroundColor: 'white',
      height: Math.floor(Dimensions.get('window').width * 0.3) + 20,
      width: Math.floor(Dimensions.get('window').width * 0.3) + 20,
    },
    logosm: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: [{translateX: -Math.floor(Dimensions.get('window').width / 2 * 0.3)/2}, {translateY: -Math.floor(Dimensions.get('window').width / 2 * 0.3)/2}]
    },
    logo: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: [{translateX: -Math.floor(Dimensions.get('window').width * 0.4 * 0.3)/2}, {translateY: -Math.floor(Dimensions.get('window').width * 0.4 * 0.3)/2}]
    }
});

export default generateQRCode;