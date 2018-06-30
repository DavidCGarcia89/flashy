import RPi.GPIO as GPIO
from time import sleep
import sys
 
GPIO.setmode(GPIO.BCM)

Motor2A = int(sys.argv[1])
print(Motor2A)

GPIO.setup(Motor2A,GPIO.OUT)

print('Turning light on')

GPIO.output(Motor2A,GPIO.LOW)

sleep(2)

print('Turning light off')
GPIO.output(Motor2A,GPIO.HIGH)   
GPIO.cleanup()