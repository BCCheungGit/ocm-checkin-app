import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

function generateQRCode(param1, param2) {
  if (!param1 && !param2) {
    return null;
  }

  const code = param1 + "," + param2;
  const windowWidth = Dimensions.get('window').width;
  const qrCodeSize = Math.floor(windowWidth * 0.7); // Adjust the size as desired

  const logoSize = Math.floor(qrCodeSize * 0.3); // Adjust the logo size as desired

  const qrCodeStyle = {
    marginTop: 20,
    marginBottom: 20,
    width: qrCodeSize,
    height: qrCodeSize,
  };

  const logoLink = require('../images/ocmlogo-removebg-preview.jpg'); // Replace with the actual logo image path

  return (
    <View>
      <QRCode value={code} size={qrCodeSize} style={qrCodeStyle} />
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
    top: '35%', // Adjust the logo position as desired
  },
});

export default generateQRCode;