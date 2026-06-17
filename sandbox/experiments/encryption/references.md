# 参考文献

- Advanced Encryption Standard (AES) — National Institute of Standards and Technology, FIPS 197, 2001 / updated 2023, https://csrc.nist.gov/pubs/fips/197/final: AES が 128 ビットブロックを鍵で変換する標準であること、AES-128/192/256 の位置づけの根拠。
- Recommendation for Block Cipher Modes of Operation: Galois/Counter Mode (GCM) and GMAC — NIST, SP 800-38D, 2007, https://csrc.nist.gov/pubs/sp/800/38/d/final: AES-GCM が認証付き暗号であり、暗号化と認証タグを組にする説明の根拠。
- An Interface and Algorithms for Authenticated Encryption — D. McGrew, RFC 5116, 2008, https://www.rfc-editor.org/rfc/rfc5116: AEAD の入力が鍵・nonce・平文・関連データであり、nonce の一意性が必要であることの根拠。
- ChaCha20 and Poly1305 for IETF Protocols — Y. Nir, A. Langley, RFC 8439, 2018, https://www.rfc-editor.org/rfc/rfc8439: ストリーム暗号が鍵ストリームを生成し、nonce 再利用で平文同士の XOR が漏れる説明の根拠。
- The Transport Layer Security (TLS) Protocol Version 1.3 — E. Rescorla, RFC 8446, 2018, https://www.rfc-editor.org/rfc/rfc8446: 実際の通信ではハンドシェイクで交通鍵を導出し、以後のレコードを AEAD で保護する流れの根拠。
