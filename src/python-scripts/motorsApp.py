import RPi.GPIO as GPIO
from time import sleep
import sys
 
GPIO.setmode(GPIO.BCM)

gpioPin = int(sys.argv[1])

GPIO.setup(gpioPin,GPIO.OUT)

GPIO.output(gpioPin,GPIO.HIGH)

sleep(2)

GPIO.output(gpioPin,GPIO.LOW)   
GPIO.cleanup()