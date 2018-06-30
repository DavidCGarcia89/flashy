import RPi.GPIO as GPIO
from time import sleep
import sys
 
GPIO.setmode(GPIO.BCM)

for x in range(1,27):
    Motor2A = x
    print(Motor2A)

    GPIO.setup(Motor2A,GPIO.OUT)

    print('Turning light on')

    GPIO.output(Motor2A,GPIO.HIGH)
for y in range (1,27):
    sleep(2)

    print('Turning light off')
    GPIO.output(Motor2A,GPIO.LOW)   
GPIO.cleanup()