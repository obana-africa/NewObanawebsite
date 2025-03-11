# Obana Project  

Welcome to the **Obana Project**! This repository contains the source code for our application. Please follow the guidelines below to set up, contribute, and push changes correctly.  

## 🚀 Getting Started  

### Prerequisites  
Make sure you have the following installed on your system:  
- [Node.js](https://nodejs.org/) (Latest LTS recommended)  
- [pnpm](https://pnpm.io/) (Package manager)  

### 🔧 Installation  

1. **Clone the repository:**  
   ```sh
   git clone https://github.com/obana-company/obana-project.git
   cd obana-project
   ```

2. **Install dependencies using pnpm:**  
   ```sh
   pnpm install
   ```

### 🏃 Running the Project  

To start the development server, run:  
```sh
pnpm dev
```

The application should now be running at `http://localhost:3000/` (or another port if specified).  

### 🔨 Building for Production  

Before pushing your changes, always build the project to ensure everything compiles correctly:  
```sh
pnpm build
```

---

## 📌 Contributing  

### 1️⃣ Create a New Branch  

Before making any changes, **always create a new branch from the `main` branch**:  

```sh
git checkout main
git pull origin main  # Ensure you have the latest updates
git checkout -b feature/your-branch-name
```

### 2️⃣ Make Your Changes  

- Modify the necessary files  
- Test your changes by running `pnpm dev`  
- Ensure everything builds correctly with `pnpm build`  

### 3️⃣ Commit and Push  

Once you're satisfied with your changes, commit them:  
```sh
git add .
git commit -m "feat: Add feature description"
```

Push your branch to the remote repository:  
```sh
git push origin feature/your-branch-name
```

### 4️⃣ Create a Pull Request (PR)  

- Go to the repository on GitHub  
- Navigate to the **Pull Requests** section  
- Click **New Pull Request**  
- Select your branch and compare it with `main`  
- Add a description of your changes and submit the PR for review  

---

## ✅ Code Guidelines  

- Follow best practices for writing clean and maintainable code  
- Keep commits small and meaningful  
- Write clear commit messages following the convention:  
  - `feat: Description of a new feature`  
  - `fix: Description of a bug fix`  
  - `chore: General maintenance and updates`  

---

## 🔗 Useful Commands  

| Command                 | Description                                  |
|-------------------------|----------------------------------------------|
| `pnpm install`         | Install project dependencies                |
| `pnpm dev`            | Start the development server                 |
| `pnpm build`          | Build the project for production             |
| `pnpm lint`           | Run linting checks                           |
| `git checkout -b <branch-name>` | Create a new branch                  |
| `git push origin <branch-name>` | Push your branch to the repository    |

---

## 📞 Need Help?  

If you have any questions or run into issues, feel free to reach out to the Obana team or create an issue in this repository.  

Happy coding! 🚀  
