import { Component } from '@angular/core';

@Component({
  selector: 'my-password-tester',
  templateUrl: './password-tester.component.html',
})
export class PasswordTesterComponent {
  password = '';
  currentPasswordStatus: PasswordStatus = PasswordStatus.Empty;
  sectionColors = colorBars.Empty;
  displayStatusPassword = PasswordStatus[+this.currentPasswordStatus];

  calculateStrength(password: string) {
    if (password.length === 0) {
      this.currentPasswordStatus = PasswordStatus.Empty;
      this.sectionColors = colorBars.Empty;
      this.updateDisplayPasswordStatus();
      return;
    }
    if (password.length < 8) {
      this.currentPasswordStatus = PasswordStatus.NotEnough;
      this.updateSectionColors();
      this.updateDisplayPasswordStatus();
      return;
    }
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasDigits = /[0-9]/.test(password);
    const hasSymbols = /[!@#$%^&*()]/.test(password);

    if (hasLetters && hasDigits && hasSymbols) {
      this.currentPasswordStatus = PasswordStatus.Strong;
    } else if (
      (hasLetters && hasDigits) ||
      (hasLetters && hasSymbols) ||
      (hasDigits && hasSymbols)
    ) {
      this.currentPasswordStatus = PasswordStatus.Medium;
    } else {
      this.currentPasswordStatus = PasswordStatus.Weak;
    }
    this.updateSectionColors();
    this.updateDisplayPasswordStatus();
  }
  updateSectionColors() {
    switch (this.currentPasswordStatus) {
      case PasswordStatus.Empty:
        this.sectionColors = colorBars.Empty;
        break;
      case PasswordStatus.NotEnough:
        this.sectionColors = colorBars.NotEnough;
        break;
      case PasswordStatus.Weak:
        this.sectionColors = colorBars.Weak;
        break;
      case PasswordStatus.Medium:
        this.sectionColors = colorBars.Medium;
        break;
      case PasswordStatus.Strong:
        this.sectionColors = colorBars.Strong;
        break;
    }
  }
  updateDisplayPasswordStatus() {
    this.displayStatusPassword = PasswordStatus[+this.currentPasswordStatus];
  }
}
enum PasswordStatus {
  Empty,
  NotEnough,
  Weak,
  Medium,
  Strong,
}
const colorBars = {
  Empty: ['gray', 'gray', 'gray'],
  NotEnough: ['red', 'red', 'red'],
  Weak: ['red', 'gray', 'gray'],
  Medium: ['yellow', 'yellow', 'gray'],
  Strong: ['green', 'green', 'green'],
};
