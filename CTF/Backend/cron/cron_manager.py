

import os

class CronManager:
    def __init__(self) -> None:
        self.cron_file = '/var/spool/cron/crontabs/root'
        self.time_regex = '([0-9].*\ |\*\ ){5}'
        self.cleaner_command = f'sh /app/disk_cleaner.sh \| xargs >> /var/log/cron.log'
    
    def update_cleaner_time(self, new_time=None):
        sed_command = f'sed -E "s:^{self.time_regex}(\ *){self.cleaner_command}$:{new_time} {self.cleaner_command}:" {self.cron_file}'
        return os.popen(sed_command).read()
    