import RPi.GPIO as GPIO
from time import sleep
import sys
 
GPIO.setmode(GPIO.BCM)

Motor2A = int(sys.argv[1])

GPIO.setup(Motor2A,GPIO.OUT)

GPIO.output(Motor2A,GPIO.HIGH)

sleep(2)

GPIO.output(Motor2A,GPIO.LOW)   
GPIO.cleanup()