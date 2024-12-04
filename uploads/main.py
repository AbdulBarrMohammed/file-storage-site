def how_many_vowels(text):
    """"""
    lowerCaseText = text.lower()
    aCount = lowerCaseText.count('a')
    eCount = lowerCaseText.count('e')
    iCount = lowerCaseText.count('i')
    oCount = lowerCaseText.count('o')
    uCount = lowerCaseText.count('u')

    total = aCount + eCount + iCount + oCount + uCount
    return total

print(how_many_vowels("Aeiou!"))


#ps05-temperature.py

userInput = int(input("Please enter a temperature: "))
c = (userInput - 32) * (5/9)
f = (userInput * (9/5)) + 32
print("The converted temperature is: ")
print(f"{userInput} Fahrenheit -> {c} Celsius")
print(f"{userInput} Celsius -> {f} Fahrenheit")

#ps05-tempWithFunctions.py
def fromCtoF(temperature):
    f = (temperature * (9 / 5)) + 32
    return f

def fromFtoC(temperature):
    c = (temperature - 32) * (5 / 9)
    return c

userTemp = int(input("Please enter a temperature: "))
cel = fromFtoC(userTemp)
fah = fromCtoF(userTemp)
print("The converted temperature is: ")
print(f"{userTemp} Fahrenheit -> {cel} Celsius")
print(f"{userTemp} Celsius -> {fah} Fahrenheit")

