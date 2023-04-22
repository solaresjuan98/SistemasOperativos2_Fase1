package main

import (
	"bufio"
	"context"
	"fmt"
	"os"
	"os/exec"
	"strconv"
	"strings"
)

// App struct
type App struct {
	ctx context.Context
}

// Memory usage struct
// type MemUsage struct {
// 	availableMemory string
// 	usedMemory string
// 	sizeMemory string
// 	percMemory string
// }

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	out, err := exec.Command("mpstat", "1", "1").Output()

	if err != nil {
		//fmt.println(err)
		return "f"
	}

	lines := strings.Split(string(out), "\n")

	tokens := strings.Fields(lines[3])

	// Convertir el campo %idle en un numero float
	idle, err := strconv.ParseFloat(tokens[11], 64)

	return fmt.Sprintf("Hello %s, It's show time!, and the idle is %f", name, idle)
}

func (A *App) CPUUsage() string {

	out, err := exec.Command("mpstat", "1", "1").Output()

	if err != nil {
		//fmt.println(err)
		return "An error has occurred"
	}

	lines := strings.Split(string(out), "\n")

	tokens := strings.Fields(lines[3])
	fmt.Println(tokens)
	// Convertir el campo %idle en un numero float
	idle, err := strconv.ParseFloat(tokens[11], 64)

	return fmt.Sprintf("%f", idle)
}

func (A *App) DiskUsage() string {

	cmd := exec.Command("df", "--output=avail,size,pcent")

	out, err := cmd.Output()

	if err != nil {
		fmt.Println("Error", err)
		//return
	}

	lines := strings.Split(string(out), "\n")

	tokens := strings.Fields(lines[2])

	fmt.Println(tokens)

	// * Available
	available, _ := strconv.ParseFloat(tokens[0], 64)

	// * Size
	size, _ := strconv.ParseFloat(tokens[1], 64)

	// * Percentage
	// perc, _ := strconv.ParseFloat(tokens[2], 64)

	// * Used
	used := size - available

	return fmt.Sprintf("%f", used/1024)

}

func (A *App) GetDiskSize() string {

	cmd := exec.Command("df", "--output=avail,size,pcent")

	out, err := cmd.Output()

	if err != nil {
		fmt.Println("Error", err)
		//return
	}

	lines := strings.Split(string(out), "\n")

	tokens := strings.Fields(lines[2])

	//fmt.Println(tokens[1])

	// * Available
	//available, _ := strconv.ParseFloat(tokens[0], 64)

	// * Size
	size, _ := strconv.ParseFloat(tokens[1], 64)

	// * Percentage
	// perc, _ := strconv.ParseFloat(tokens[2], 64)

	return fmt.Sprintf("%f", size/1024)

}

func (A *App) GetRamUsage() string {

	out, _ := exec.Command("free", "-h").Output()

	lines := strings.Split(string(out), "\n")

	// * Get the second line
	tokens := strings.Fields(lines[1])

	valueWithUnits := tokens[3]
	firstThree := valueWithUnits[:3]

	free, _ := strconv.ParseFloat(firstThree, 64)

	//fmt.Println(free)

	return fmt.Sprintf("%f", free)
}

func (A *App) GetTotalRam() string {

	out, _ := exec.Command("free", "-h").Output()

	lines := strings.Split(string(out), "\n")

	// * Get the second line
	tokens := strings.Fields(lines[1])

	valueWithUnits := tokens[1]
	firstThree := valueWithUnits[:3]

	total, _ := strconv.ParseFloat(firstThree, 64)

	fmt.Println("total")
	fmt.Println(total)

	return fmt.Sprintf("%f", total)
}

func (A *App) BlockUSBPorts() {

	// // cm1 := "echo \"SUBSYSTEM==\"usb\", ATTRS{idVendor}==\"<Vendor ID>\", ATTRS{idProduct}==\"<Product ID>\", ATTR{authorized}=\"0\" \n sudo service udev restart"

	// cmd1 := "echo \" SUBSYSTEM==\"usb\", ACTION==\"add\", RUN=\"/bin/sh -c 'echo 0 >/sys/bus/usb/devices/usb1/authorized'\" \" >> /etc/udev/rules.d/disable-usb.rules"
	file, err := os.OpenFile("/etc/udev/rules.d/disable-usb.rules", os.O_WRONLY|os.O_TRUNC, 0644)

	if err != nil {
		fmt.Println(err)
		return
	}

	defer file.Close()

	// Crea un escritor
	writer := bufio.NewWriter(file)

	// Escribe en el archivo
	_, err = writer.WriteString("SUBSYSTEM==\"usb\", ATTR{authorized}=\"0\"\n")
	if err != nil {
		fmt.Println(err)
		return
	}

	// Limpia el buffer y escribe los datos en el archivo
	err = writer.Flush()
	if err != nil {
		fmt.Println(err)
		return
	}

	exec.Command("sudo", "service", "udev", "restart")

	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println("Archivo actualizado y servicio reiniciado")

}

func (a *App) Test(name string) string {
	return "Hello"
}
