import RPi.GPIO as GPIO
from time import sleep
import sys
 
GPIO.setmode(GPIO.BCM)

Motor2A = sys.argv[1]

GPIO.setup(Motor2A,GPIO.OUT)

print('Turning light on')

GPIO.output(Motor2A,GPIO.HIGH)

sleep(1)

print('Turning light off')
GPIO.output(Motor2A,GPIO.LOW)   
GPIO.cleanup()