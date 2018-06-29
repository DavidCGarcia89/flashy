import RPi.GPIO as GPIO
from time import sleep
 
GPIO.setmode(GPIO.BOARD)
 
Motor2A = 7

 
GPIO.setup(Motor2A,GPIO.OUT)

print "Turning light on"
GPIO.output(Motor2A,GPIO.HIGH)
 
sleep(2)
 
print "Turning light off"
GPIO.output(Motor2A,GPIO.LOW)

GPIO.cleanup()