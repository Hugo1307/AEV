import os

class CronLogReader:
    def __init__(self) -> None:
        self.cron_log_file = '/var/log/cron.log'
        pass
    
    def get_recent_cron_log(self):
        tail_command = f'tail -1 {self.cron_log_file}'
        return os.popen(tail_command).read()
    