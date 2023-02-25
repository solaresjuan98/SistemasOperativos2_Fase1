package main

import (
	"context"
	"fmt"
	"os/exec"
	"strings"
	"strconv"
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

	// Concertir el campo %idle en un numero float
	idle, err := strconv.ParseFloat(tokens[11], 64)


	return fmt.Sprintf("Hello %s, It's show time!, and the idle is %f", name, idle)
}


func (A *App) CPUUsage()string {
	

	out, err := exec.Command("mpstat", "1", "1").Output()

	if err != nil {
		//fmt.println(err)
		return "f"
	}

	lines := strings.Split(string(out), "\n")

	tokens := strings.Fields(lines[3])

	// Concertir el campo %idle en un numero float
	idle, err := strconv.ParseFloat(tokens[11], 64)


	return fmt.Sprintf("%f",idle)
}

func (A *App) DiskUsage()string  {
	
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
	used := size -available

	// usage := MemUsage {
	// 	availableMemory:  fmt.Sprintf("%f", available),
	// 	usedMemory: fmt.Sprintf("%f", used),
	// 	sizeMemory: fmt.Sprintf("%f", size),
	// 	percMemory: fmt.Sprintf("%f", perc),
	// }


	return fmt.Sprintf("%f",used/1024)

}

func (a *App) Test(name string) string {
	return "Hello"
}





