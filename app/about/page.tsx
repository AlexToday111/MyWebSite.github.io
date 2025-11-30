export default function AboutPage() {
  return (
    <main className="container py-8 sm:py-12 md:py-16 reveal">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Профессиональное саммари</h1>
      <p className="mt-4 text-sm sm:text-base text-muted max-w-prose">
        Молодой Java‑разработчик с опытом в Spring Boot, пониманием JVM и управления памятью,
        многопоточности (ExecutorService, CompletableFuture), тестирования и CI/CD. Владею ООП, SOLID и
        паттернами проектирования, уверенно работаю с реляционными БД. Python использую для анализа данных
        и визуализации (NumPy, Pandas, Matplotlib). Стремлюсь развиваться как backend‑инженер, постоянно
        изучая новое.
      </p>

      <section className="mt-8 sm:mt-10 grid gap-6 sm:gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold">Технические навыки</h2>
          <ul className="mt-3 space-y-1 text-sm sm:text-base text-muted">
            <li><b>Языки:</b> Java, Python, базовый C++</li>
            <li><b>Фреймворки и инструменты:</b> Spring Framework, Spring Boot, SQL, PostgreSQL, Git, LaTeX, Docker, GitLab CI</li>
            <li><b>Практики:</b> ООП и SOLID, паттерны GoF, TDD, модульное тестирование (JUnit 5, Mockito, Testcontainers)</li>
            <li><b>Конкурентность:</b> потоки, synchronized, ExecutorService, CompletableFuture</li>
            <li><b>JVM и память:</b> GC, стек/куча, профилирование</li>
            <li><b>Data/ML (базово):</b> NumPy, Pandas, Seaborn, Matplotlib</li>
            <li><b>Языки:</b> английский B1</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-semibold">Ключевые навыки</h2>
          <ul className="mt-3 list-disc pl-5 sm:pl-6 text-sm sm:text-base text-muted">
            <li>Оптимизация алгоритмов и повышение производительности</li>
            <li>Визуализация и анализ данных</li>
            <li>Работа в команде и взаимодействие с заказчиком</li>
            <li>Быстрое освоение новых технологий</li>
          </ul>

          <h2 className="mt-6 sm:mt-8 text-lg sm:text-xl font-semibold">Личные качества</h2>
          <ul className="mt-3 list-disc pl-5 sm:pl-6 text-sm sm:text-base text-muted">
            <li>Ориентация на результат и саморазвитие</li>
            <li>Умение слушать коллег и находить общий язык</li>
            <li>Готовность к вызовам, стрессоустойчивость</li>
            <li>Активность в спортивных и исследовательских проектах</li>
          </ul>
        </div>
      </section>

      <section className="mt-8 sm:mt-10">
        <h2 className="text-lg sm:text-xl font-semibold">Онлайн‑профили</h2>
        <div className="mt-3 flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm">
          <a className="rounded-xl px-3 py-1.5 bg-white/5 hover:bg-white/10" href="https://github.com/AlexToday666" target="_blank" rel="noreferrer">GitHub</a>
          <a className="rounded-xl px-3 py-1.5 bg-white/5 hover:bg-white/10" href="https://gitlab.com/e.kudakaev" target="_blank" rel="noreferrer">GitLab</a>
          <a className="rounded-xl px-3 py-1.5 bg-white/5 hover:bg-white/10" href="https://leetcode.com/AlexToday666" target="_blank" rel="noreferrer">LeetCode</a>
        </div>
      </section>

      <section className="mt-8 sm:mt-10">
        <h2 className="text-lg sm:text-xl font-semibold">Дополнительные активности</h2>
        <ul className="mt-3 list-disc pl-5 sm:pl-6 text-sm sm:text-base text-muted">
          <li>Соревнования по программированию</li>
          <li>Исследовательская работа по алгоритмам и структурам данных</li>
          <li>Онлайн‑курсы по Java‑разработке, ML и Data Science</li>
          <li>Спортивные мероприятия университета</li>
        </ul>
      </section>
    </main>
  );
}

