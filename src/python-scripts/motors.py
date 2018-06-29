import RPi.GPIO as GPIO
from time import sleep
 
GPIO.setmode(GPIO.BCM)
for x in range(26, 38):
    Motor2A = x
    
    GPIO.setup(Motor2A,GPIO.OUT)

    print('Turning light on')
    print(x)
    GPIO.output(Motor2A,GPIO.HIGH)
    
    sleep(1)
    
    print('Turning light off')
    GPIO.output(Motor2A,GPIO.LOW)   
GPIO.cleanup()