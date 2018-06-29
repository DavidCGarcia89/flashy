import RPi.GPIO as GPIO
from time import sleep
 
GPIO.setmode(GPIO.BOARD)
 
Motor1A = 16
 
GPIO.setup(Motor1A,GPIO.OUT)

print "Turning light on"
GPIO.output(Motor1A,GPIO.HIGH)
 
sleep(2)
 
print "Turning light off"
GPIO.output(Motor1E,GPIO.LOW)
 
GPIO.cleanup()