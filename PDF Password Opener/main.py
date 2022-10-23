import pikepdf
from tqdm import tqdm
passwords = [line.strip() for line in open("wordlist.txt")]
for password in tqdm(passwords, "Decrypting PDF"):
    try:
        with pikepdf.open("DSMUN DISEC BG.pdf", password=password) as pdf:
            print("\n[+] Password:",password)
            break
    except pikepdf._qpdf.PasswordError as e:
        continue
