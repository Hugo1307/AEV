from sha256 import sha256
import os
import binascii
import struct


"""
m1 = original message - message used to calculate the original signature
m2 = message that I want to inject
h1 = digest calculated with original message
"""
def calculate_hacked_cookie(m1, m2, h1, secret_len):
    
    # Convert the previous hash to a list of longs
    state = []
    
    for x in range(0, len(h1), 8):
        state.append(int(h1[x:x+8], 16))

    s = sha256(m=m2, s=state, l=64*(1+(len(m1)+secret_len)//64)) 
    h2 = binascii.hexlify(s.hexdigest())

    padding = b'\x80' + b'\0' * (64 - (secret_len + len(m1) + 1 + 8) % 64) + struct.pack('!Q',(len(m1) + secret_len)*8)

    payload = m1 + padding + m2

    return payload, h2
