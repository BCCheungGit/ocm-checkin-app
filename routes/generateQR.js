import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import QRCode from 'react-native-qrcode-svg';



function generateQRCode(param1, param2) {
  if (!param1 && !param2) {
    return null;
  }
  const { width } = Dimensions.get('window');
  const isSmallScreen = width < 375;

  const code = param1 + "," + param2;
  const windowWidth = Dimensions.get('window').width;
  const qrCodeSize = isSmallScreen ? Math.floor(windowWidth * 0.4) : Math.floor(windowWidth * 0.3); // Adjust the size as desired

  const logoSize = Math.floor(qrCodeSize * 0.3); // Adjust the logo size as desired

  const qrCodeStyle = {
    marginTop: 20,
    marginBottom: 20,
    width: qrCodeSize,
    height: qrCodeSize,
  };

  const logoLink = require('../images/ocmlogo-removebg-preview.jpg'); // Replace with the actual logo image path

  return (
    <>
        <View style={isSmallScreen? styles.qrcontainer : styles.largecontainer}>
        <QRCode value={code} size={qrCodeSize} style={qrCodeStyle} />
        
        <Image source={logoLink} style={[isSmallScreen ? styles.logosm : styles.logo, { width: logoSize, height: logoSize }]} />
        </View> 
   </>
  );
}

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