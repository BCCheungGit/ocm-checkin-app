import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

function generateQRCode(param) {
  if (!param) {
    return null;
  }

  const windowWidth = Dimensions.get('window').width;
  const qrCodeSize = Math.floor(windowWidth * 0.7); // Adjust the size as desired

  const logoSize = Math.floor(qrCodeSize * 0.38); // Adjust the logo size as desired

  const qrCodeStyle = {
    marginTop: 20,
    marginBottom: 20,
    width: qrCodeSize,
    height: qrCodeSize,
  };

  const logoLink = require('../images/ocmlogo-removebg-preview.jpg'); // Replace with the actual logo image path

  return (
    <View>
      <QRCode value={param} size={qrCodeSize} style={qrCodeStyle} />
      <Image source={logoLink} style={[styles.logo, { width: logoSize, height: logoSize }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    position: 'absolute',
    alignSelf: 'center',
    resizeMode: 'contain',
    top: '30%', // Adjust the logo position as desired
  },
});

export default generateQRCode;