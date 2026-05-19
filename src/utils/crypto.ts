import forge from "node-forge";

const cryptoUtils = {


  // 使用forge加密（更接近RSA/ECB/NoPadding）
  RSA_Encrypt(text: string): string | null {
    try {
      const PUBLIC_KEY_BASE64 =
        "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC7UEOgJK80WRLyfndV9m99Py+rdTf0FEGEBe8swW7yg2bXYyVfLwzp3v23BLauaWKYCLlqUVaS+r44HelWptNxzF/Xxatj1Lwc1VNiDQKGQv3RNYb1H3bZZ4SYwGCderumDup4F2PsEk7aT95TLiU8H4S/jz3LrSiF7yD4yqRmDQIDAQAB";
      
      // 解码Base64公钥
      const publicKeyDer = forge.util.decode64(PUBLIC_KEY_BASE64);
      const publicKey = forge.pki.publicKeyFromAsn1(
       forge.asn1.fromDer(publicKeyDer)
      );
      
      // 转换为字节数组
      const bytes = forge.util.encodeUtf8(text);
      
      // 使用无填充模式加密
      const encrypted = publicKey.encrypt(bytes, "NONE");
      
      // 返回Base64编码结果
      return forge.util.encode64(encrypted);
    } catch (e) {
      console.error("加密错误:", e);
      return null;
    }
  },
};

export default cryptoUtils;